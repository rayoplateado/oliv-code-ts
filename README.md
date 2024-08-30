This code set originates from a personal side project, incorporating insights I gained during my time at Boopos. The focus is on two main areas, which are detailed in the following Product Information Documents (PIDs) that I used to define projects.

In this document, I’ll outline how I addressed two key challenges: 

1. maintaining architectural consistency across all system contexts (or modules)
2. implementing comprehensive logging for all operations within the system.

# Challenge 1: **Architectural Inconsistency**

The current system is composed of multiple contexts, each exporting services, repositories, and models for use by other contexts. Services, in particular, are collections of actions performed on one or more models, often requiring numerous dependencies to manage all possible operations.

## Problem

There is a significant lack of uniformity in the implementation of different contexts within the system. This inconsistency complicates the decision-making process when determining which architectural approach should be adopted as the standard.

Additionally, services have become excessively large, burdened with too many dependencies. This bloated structure complicates the understanding of each service and assigns too many responsibilities to a single service, violating the Single Responsibility Principle (SRP).

## Solution

To address these issues, I implemented the Command Query Separation (CQS) pattern to clearly differentiate between read and write operations. Each write operation is encapsulated within a simple Command class that receives the necessary dependencies to execute the operation on a model or a group of models.

### Implementation Steps

1. **Create a CommandHandler Class**: This class is responsible for executing the actions defined in a command.
2. **Integrate CommandHandler into Controllers**: Pass the CommandHandler to all controllers within the system.
3. **Refactor Service Methods into Commands**: Each operation in the system, originally a service method, will be refactored into a command (or a query).
4. **Execute Commands via CommandHandler**: Use the CommandHandler in controllers to execute specific operations within the system.

**References:**

- [PreDealsController.ts](https://github.com/javiacei/interviews-code-ts/blob/main/app/src/bff/origination/PreDealsController.ts)
- [ApplyPreDealCommand.ts](https://github.com/javiacei/interviews-code-ts/blob/main/app/src/origination/application/commands/ApplyPreDealCommand.ts)

# Challenge 2: **User Activity Tracking**

In fintech products, maintaining a detailed history of actions executed by users is crucial for accountability, troubleshooting, and security analysis. It's essential to track all actions performed within the system and identify the user responsible for each action.

Currently, our system allows us to view requests executed by checking logs in AWS and Logtail, but this is limited to the last 30 days and does not provide a comprehensive view of all operations.

## Problem

The system currently lacks a robust mechanism to record and timestamp user actions, resulting in the following challenges:

- **Limited Request History**: We only have access to request logs for the past 30 days.
- **Incomplete Operation Reconstruction**: Reconstructing the exact operations executed by users is difficult.
- **No User-Specific Operation Logs**: We cannot easily display the actions performed by a specific user at a particular time.

## Solution

Given that our system already separates read and write operations, we can enhance our tracking by logging these commands in the database. This will allow us to capture detailed information about when a command was initiated, by whom, and its success or failure.

### Implementation Steps

1. **Create a Command Tracking Model**: Develop a new model in the shared module of our system to track the status of commands (system actions).
2. **Enhance Command Handling**: Modify the command handling process to support both the old method (which doesn't track status) and the new method (which does):
    - **Mark Command as "Started"**: Log the command as "started" by an "initiator" when the CommandHandler receives it.
    - **Execute Command**:
        - **Mark as "Completed"**: Log the command as "completed" if execution is successful.
        - **Mark as "Failed"**: Log the command as "failed" if execution fails, including the error message for future troubleshooting.
3. **Use the New `Command` Base Class**: Begin using the new `Command` base class when creating new commands.
4. **Refactor Existing Commands**: Update existing commands to inherit from the new `Command` base class, ensuring consistent tracking.

**References:**

- [CommandHandler.ts](https://github.com/javiacei/interviews-code-ts/blob/main/app/src/base/domain/CommandHandler.ts)
- [Command.ts](https://github.com/javiacei/interviews-code-ts/blob/main/app/src/base/domain/models/Command.ts)
- [ApplyPreDealCommand.ts](https://github.com/javiacei/interviews-code-ts/blob/main/app/src/origination/application/commands/ApplyPreDealCommand.ts#L15)
