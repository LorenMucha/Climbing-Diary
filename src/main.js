const DatabaseManager = require("../src/database/Manager");
const ClimbingTaskRepository = require("../src/database/ClimbingTasks");
const MainView = require("../src/view/MainView");
const ClimbingView = require("../src/view/ClimbingView");
const Sidebar = require('../src/view/Sidebar');
const Navbar = require("../src/view/Navbar");
const Colors = require("../src/models/Colors");
const Styles = require("../src/models/Styles");
/*initialize the classes*/
const db_manager = new DatabaseManager('./data/touren.db');
const climbing_taskRepo = new ClimbingTaskRepository(db_manager);
const main_view = new MainView();
const climbing_view = new ClimbingView();

function main(){
    var sidebar = new Sidebar("routen");
    var navbar = new Navbar();
    $(window).resize(function(){
        climbing_view.refreshView();
    });
}
