// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;  // Specifies the version of solidity that our code is written with

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error InvalidTaskId (string error_message_);

contract TodoList is ReentrancyGuard, Ownable{

    // todo list status
    enum TodoStatuses {
        PENDING,
        COMPLETE
    }

    // todo list record
    struct Todo{

        // tasks id
        uint256 id;

        // task title
        string title;

        // task status
        TodoStatuses status;

    }

    TodoStatuses private constant _DEFAULT_CHOICE = TodoStatuses.PENDING;

    Todo[] private _listOfTodos;

    // A mapping of task IDs to task descriptions
    // mapping(uint => string) private _tasks;

    // The next task ID to assign
    uint256 private nextTaskId = 1;

    // Adds a new task to the list
    function addTask(string memory title_) external onlyOwner nonReentrant{
        Todo memory todo = Todo(nextTaskId, title_,  _DEFAULT_CHOICE);
        _listOfTodos.push(todo);
        nextTaskId++;
    }

    // Get a task from the list.
    function getTask(uint256 taskId_) public view returns (Todo memory){
        if (taskId_ >= _listOfTodos.length){
            revert("tdl:gt");
        }
        return _listOfTodos[taskId_];
    }

    function markComplete(uint taskId_) external onlyOwner nonReentrant{
        // Mark a task as complete
        if (taskId_ >= _listOfTodos.length){
            revert("tdl:mc");
        }
        _listOfTodos[taskId_].status = TodoStatuses.COMPLETE;
    }

    function getTaskStatusAtIndex(uint taskId_)
        external
        view
        onlyOwner
        returns (TodoStatuses)
    {
        if (taskId_ >= _listOfTodos.length){
            revert("tdl:gtsai");
        }
        return _listOfTodos[taskId_].status;
    }

    function getTaskTextAtIndex(uint taskId_)
        external
        view
        onlyOwner
        returns (string memory)
    {
        if (taskId_ >= _listOfTodos.length){
            revert("tdl:gttai");
        }
        return _listOfTodos[taskId_].title;
    }

    // Removes a task from the list
    function removeTask(uint256 taskId_) external onlyOwner nonReentrant{
        if (taskId_ >= _listOfTodos.length){
            revert("tdl:rt");
        }
        _listOfTodos[taskId_] = _listOfTodos[_listOfTodos.length - 1];
        _listOfTodos.pop();
    }

    // Update a task from the list.
    function updateTask(uint256 taskId_, string memory text_) external onlyOwner nonReentrant{
        if (taskId_ >= _listOfTodos.length){
            revert("tdl:ut");
        }
        _listOfTodos[taskId_].title = text_;
    }

    // Total task count from the list.
    function totalCountTask() public view returns (uint){
        return _listOfTodos.length;
    }

}

