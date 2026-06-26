---
title: Imitation Learning Pipeline
description: |
    Summary of the software engineering behind building an 
    imitation learning infrastructure for the Pracsys Lab.
preview: /images/cube_stack.webp
date: 8/31/2025
---

::prose-img
---
src: /images/cube_stack.webp
class: w-full h-[16rem] object-cover
---
::

During my research assistantship at the Pracsys Lab during the summer of 2025, there was growing interest in imitation learning and large-scale VLA models. However, our lab lacked the infrastructure to collect data and deploy these policies on our robots. I volunteered to build this pipeline so we could conduct experiments with the new VLA models.

## Goals

Our existing robot software stack is built around our Motoman SDA10F robot and is designed for open-loop control. However, it was placed in a Catkin workspace with several unused packages, files, and scripts — making difficult to understand. It also ran on Ubuntu 20.04 and ROS Noetic — both older software versions. We also had access to another lab's Ur5e robot, but it had never been used before.

My goal for the new infrastructure was as follows:

1. **Clarity**
     - The ROS workspace should have a minimal set of packages and code. Additional unused packages add mental load to learning how the project works.
     - Code should be self-documenting, or contain comments to explain specific implementations quirks.
2. **Flexibility**
     - Standard APIs should be used whenever possible, to avoid locking code into a specific robot, software library, or implementation.
3. **Reuse**
     - The workspace should run on the same Ubuntu and ROS versions as the old code to reuse existing packages whenever possible.
       - Since the SDA10F teleoperation code depends on now deprecated libraries, I wanted to avoid upgrading ROS because that would entail re-implementing these libraries. Reusing existing code that's proven to work would therefore minimize the amount of time taken to implement a feature.

## ROS Design

With these goals in mind, I designed and implemented the following ROS node infrastructure:

::prose-img
---
src: /svgs/imitation_learning_ros.svg 
class: bg-white
---
ROS node architecture. Dotted boxes [represent](https://google.com) a common interface/API.
::


### Real Nodes

Every piece of hardware in ROS — from ZedM cameras to the SDA10F — comes with its own ROS node that handles the low-level driver communication required to fetch images from a camera, or control a joint on a robot. The "API" of a ROS Node can be seen as the topics and services that it publishes. These `Real Nodes` aren't standardized and exposed a variety of different APIs.

::admonition{title="Example" type="info"}
Since the Motoman SDA10F is a dual-arm robot, it's underlying driver treats each arm as separate "robot groups". And despite each arm sharing the same base joint, the base joint itself for each arm is treated as separate "robot groups". 

Therefore the Motoman ROS node publishes to **four** joint states topics.
::

### Robot Interface

While we could modify the source code of the real nodes to standardize their API, that would make the library code-base more fragile to upstream changes from the original authors. Therefore, `Robot Interface Nodes` were created to convert their non-standard ROS node API to a standard API.

- All robots
  - Published their current joint states to a `/ROBOT_NAME/joint_states` topic
  - Listened to a `/teleop/joint_states` to control its joint positions
- All cameras published their RGB and depth images to `/CAMERA_NAME/rgb` and `/CAMERA_NAME/depth` topics

::admonition{title="Example" type="info"}
These interfaces sometimes have to do non-trival conversions, such as in the case of the `Motoman Interface Node`. Due to how the underlying Motoman driver works, the `Real Motoman Node` has a joint streaming quirk where any joint command sent during streaming cannot be interrupted. 

Joint commands are also published with a duration that the movement should take, and the underlying driver then moves to the new joint states over the specified duration. If joint commands are sent faster than Motoman can consume, it can create a backlog that can eventually overflow the Motoman driver's internal queue.

Therefore, the interface node has to publish joint commands at the rate the driver is following the commands, by checking if the current joint state is within a specific tolerance to the target joint state.

This is just one example of a motoman driver quirk. Small hardware-specific behaviors like theses required additional code to coerce into our standardized API.
::

### Robot Sim

To support collecting data and deploying policies in simulation, I used the open-source [MuJoCo](https://github.com/google-deepmind/mujoco) physics engine. Since we had existing code and digital models built for SDA10F in MuJoCo, this was the easiest simulator to use.

I created a `MuJoCo Sim Node` that simulates a scene and exposes a ROS API for interacting with it. It publishes topics for joint states and camera images, while listening to topic for joint controls.

Then simulated versions of the hardware nodes were created that exposed the same API as their underlying hardware but used the MuJoCo Sim under the hood. By replicating the existing hardware API, I could test `Robot Interface` nodes in simulation prior to deploying on the real robot.

::admonition{title="Example" type="info"}
The `Motoman Sim Node` would expose the four joint states topics that the real Motoman node used, as well as the ROS services for controlling joint streaming. This joint streaming followed the non-interruptable and duration-driven behavior as the real robot, and replica was especially useful in testing our `Motoman Interface Node` implementation.
::

### Teleoperation

To publish the joint commands for the robot, I built `Teleop Nodes`. These nodes publish to `/teleop/joint_states`, which is the same topic that `Robot Interface Nodes` consume. Teleop nodes can represent human input (keyboard, GELLO, etc.), or a deployed policy running inference ($\pi_0$, etc).

::prose-video
---
src: /videos/gello.mp4
class: h-[32rem]
controls: true
muted: true
loop: true
loading: lazy
---
Teleoperation using a 3D-printed [GELLO](https://wuphilipp.github.io/gello_site/) controller.
::

### Data Collection

Finally, a `Data Collector Node` collects all the information —  robot joint states, camera images, and teleop joint commands — and sends it to a `Data Writer` process, which writes the data to disk in a specific format ([LeRobot](https://github.com/huggingface/lerobot/), Hdf5, etc.). Each run or "episode" is a single action, such as stacking a pile of cubes or closing a drawer.

::admonition{title="Note" type="info"}
The `Data Writer` is not a ROS node but rather a separate python process that uses ZMQ sockets. Due to using Ubuntu 20.04 and ROS Noetic, we are forced to use Python 3.8 for ROS. However, many Python libraries only work with newer Python versions.

Therefore, I moved the data writing code to a separate process to support data writers that use different python versions.
::

::prose-video
---
src: /videos/cube_stack.webm
class: h-auto
controls: true
muted: true
loop: true
loading: lazy
---
Data collection in simulation using a GELLO arm.
::

To better visualize our data, I wrote a script that can load an episode into [rerun.io](https://github.com/rerun-io/rerun). These replays can help us diagnose what happened during a run — especially when we're collecting several experiments in simulation. 

::prose-video
---
src: /videos/rerun.webm
class: h-auto
controls: true
muted: true
loop: true
loading: lazy
---
Reviewing collected data inside rerun. 
::

## Additional Bits

Aside from the core ROS architecture, these are the most important pieces of code I wrote for the project.

### Robot Config

Inside the `robot_config.py` script holds a dictionary of different robot configurations. Each robot configuration included joint, mujoco, gripper, and camera information. 

Each ROS node that needs robot specific information can then load a configuration from a name passed into its CLI.
 
::admonition{title="Example" type="info"}
A keyboard_teleop node that wants to load the `motoman` config and control its first arm would run the following:

```
keyboard_teleop.py motoman 0
```
::

### `run_ros.py`

This script reads a `.yaml` ROS config file that specifies a list of commands to run, and then runs the commands in a single [tmux](https://github.com/tmux/tmux/wiki) session with different tmux windows. The `.yaml` config file can also define variables that are substituted into the commands for more dynamic behaviors. 

### `ws_install.sh`

This script installs the entire workspace onto a new Ubuntu 20.04 computer. It automatically installs required dependencies if they aren't present.

### `hotreload.py`

This script opens a MuJoCo scene xml file in a MuJoCo viewer and hot-reloads the viewer whenever the scene xml is changed.


::prose-video
---
src: /videos/hotreload.mp4
class: h-auto
controls: true
muted: true
loop: true
loading: lazy
---
Editing a scene with `hotreload.py`.
::

## Lessons

After finishing this project, I had the following takeaways

1. **Understand Your Hardware — Document Everything!**
   - There will inevitably come a time when the robot throws an error in its pendant and it's up to you to trace down a fix. Especially for older/niche robots (like the Motoman SDA10F), online discourse and troubleshooting resources are limited. 
   - After encountering several unique errors on the Motoman that took days to troubleshoot, I created a `motoman/documentation` folder in the repository that stored manuals for the Motoman SDA10F robot, the FS100 controller, the Robotiq 2f-85 gripper, and the Robotiq universal controller. Additionally, I wrote a `README.md` file that documents basic operation of the robot, manually controlling through the pendant, robot joint calibration, and steps for resolving specific errors that may occur on the pendant. By documenting your hardware, the next grad-student who's inheriting the robot will have an easier time working with it.
2. **Quality of Life Matters**
   - Small scripts can make a big difference in maintaining cleaner workspace and working with our physics simulator.
   - Keeping our `ws_install.sh` script not only makes it easy to rebuild the repository if something breaks, but also makes it easy to on-board new undergraduates onto the repository.
   - The `hotreload.py` script brought a "web-dev" like experience of live editing to MuJoCo, and made it faster to build scenes by hand.
   - The `run_ros.py` script created a standard way to define ROS node networks, allowing us to build different configs for simulation and real environments.
3. **Simplify, Simplify**
   - While ROS nodes serve as a useful framework for splitting code, too many nodes can slow down performance and hog CPU time due to the overhead of forwarding messages and running multiple processes.
   - My choice to replicate an existing hardware API in sim — while making it easier to test the interface classes — added additional complexity and computational overhead. A simpler architecture would have the simulation nodes follow the standard `Robot Interface` API.

## Closing

This project was my first shot at building a ROS infrastructure from scratch. Coming in with no background in robotics, I've quickly learned new software like ROS, RViz, and MuJoCo, and gained experience in designing modular ROS nodes. I'm looking forward to applying these skills to my next project.