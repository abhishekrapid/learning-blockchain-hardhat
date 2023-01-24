const { expect } = require('chai');
const { ethers } = require("hardhat");

describe('todolist test', function () {
    it('should create task', async function () {
        const TodoList = await ethers.getContractFactory('TodoList');
        const todoList = await TodoList.deploy();
        await todoList.deployed();

        expect(await todoList.totalCountTask()).to.equal(0);

        todoList.addTask('Learn python');
        todoList.addTask('Learn web scrapping');
        todoList.addTask('Learn blockchain');

        expect(await todoList.totalCountTask()).to.equal(3);
    });

    it('Should mark a task complete', async function () {
        const TodoList = await ethers.getContractFactory('TodoList');
        const todoList = await TodoList.deploy();
        await todoList.deployed();

        expect(await todoList.totalCountTask()).to.equal(0);

        todoList.addTask('Learn python');
        todoList.addTask('Learn web scrapping');
        todoList.addTask('Learn blockchain');

        expect(await todoList.getTaskStatusAtIndex(0)).to.equal(0);
        expect(await todoList.getTaskStatusAtIndex(1)).to.equal(0);
        expect(await todoList.getTaskStatusAtIndex(2)).to.equal(0);

        await todoList.markComplete(1);

        expect(await todoList.getTaskStatusAtIndex(0)).to.equal(0);
        expect(await todoList.getTaskStatusAtIndex(1)).to.equal(1);
        expect(await todoList.getTaskStatusAtIndex(2)).to.equal(0);

        expect(await todoList.totalCountTask()).to.equal(3);
    });

    it('Should get a task title at Index', async function () {
        const TodoList = await ethers.getContractFactory('TodoList');
        const todoList = await TodoList.deploy();
        await todoList.deployed();

        expect(await todoList.totalCountTask()).to.equal(0);

        todoList.addTask('Learn python');
        todoList.addTask('Learn web scrapping');
        todoList.addTask('Learn blockchain');

        expect(await todoList.getTaskTextAtIndex(0)).to.equal('Learn python');
        expect(await todoList.getTaskTextAtIndex(1)).to.equal('Learn web scrapping');
        expect(await todoList.getTaskTextAtIndex(2)).to.equal('Learn blockchain');

        expect(await todoList.totalCountTask()).to.equal(3);
    });

    it('Should remove a task at index', async function () {
        const TodoList = await ethers.getContractFactory('TodoList');
        const todoList = await TodoList.deploy();
        await todoList.deployed();

        expect(await todoList.totalCountTask()).to.equal(0);

        todoList.addTask('Learn python');

        expect(await todoList.totalCountTask()).to.equal(1);

        todoList.addTask('Learn web scrapping');

        expect(await todoList.totalCountTask()).to.equal(2);

        todoList.removeTask(0);

        expect(await todoList.totalCountTask()).to.equal(1);

        expect(await todoList.getTaskTextAtIndex(0)).to.equal('Learn web scrapping');
    });

    it('Should update a task at index', async function () {
        const TodoList = await ethers.getContractFactory('TodoList');
        const todoList = await TodoList.deploy();
        await todoList.deployed();

        expect(await todoList.totalCountTask()).to.equal(0);

        todoList.addTask('Learn python');

        expect(await todoList.totalCountTask()).to.equal(1);

        todoList.addTask('Learn web scrapping');

        expect(await todoList.totalCountTask()).to.equal(2);

        todoList.updateTask(0, 'Learn Blockchain');

        expect(await todoList.totalCountTask()).to.equal(2);

        expect(await todoList.getTaskTextAtIndex(0)).to.equal('Learn Blockchain');
    });

});
