import store from 'src/services/store'
import locales from 'src/locales'

let strRoute = locales[store.state.lang].routes.panel;

const info = {
    "student-affairs": {
        name: "student-affairs",
        title: strRoute["student-affairs"].title,
        route: "/panel/" + strRoute["student-affairs"].route,
        icon: 'fa-user',
    },
    "student-affairs/student-lesson-operations": {
        name: "student-affairs/student-lesson-operations",
        title: strRoute["student-affairs/student-lesson-operations"].title,
        route: '/panel/' + strRoute["student-affairs/student-lesson-operations"].route,
    },
    "student-affairs/student-lesson-operations/add-student-lesson": {
        name: "student-affairs/student-lesson-operations/add-student-lesson",
        title: strRoute["student-affairs/student-lesson-operations/add-student-lesson"].title,
        route: '/panel/' + strRoute["student-affairs/student-lesson-operations/add-student-lesson"].route,
    },
    "student-affairs/add-student": {
        name: "student-affairs/add-student",
        title: strRoute["student-affairs/add-student"].title,
        route: '/panel/' + strRoute["student-affairs/add-student"].route,
    },
    "discipline-operations": {
        name: "discipline-operations",
        title: strRoute["discipline-operations"].title,
        route: '/panel/' + strRoute["discipline-operations"].route,
        icon: 'fa-dot-circle-o',
    },
    "lesson-operations": {
        name: "lesson-operations",
        title: strRoute["lesson-operations"].title,
        route: '/panel/' + strRoute["lesson-operations"].route,
        icon: 'fa-book',
    },
    "bologna-process-management": {
        name: "bologna-process-management",
        title: strRoute["bologna-process-management"].title,
        route: '/panel/' + strRoute["bologna-process-management"].route,
        icon: 'fa-star',
    },
    "member-operations": {
        name: "member-operations",
        title: strRoute["member-operations"].title,
        route: '/panel/' + strRoute["member-operations"].route,
        icon: 'fa-user-plus',
    },
    "staff-operations": {
        name: "staff-operations",
        title: strRoute["staff-operations"].title,
        route: '/panel/' + strRoute["staff-operations"].route,
        icon: 'fa-users',
    },
    "dashboard-screens": {
        name: "dashboard-screens",
        title: strRoute["dashboard-screens"].title,
        route: '/panel/' + strRoute["dashboard-screens"].route,
        icon: 'fa-dashboard',
        children: []
    },
    "report-side": {
        name: "report-side",
        title: strRoute["report-side"].title,
        route: '/panel/' + strRoute["report-side"].route,
        icon: 'fa-bar-chart',
    },

    //*******************************************************************
    // Institution
    //*******************************************************************
    'institution-administration-panel': {
        name: 'institution-administration-panel',
        moduleName: 'institution-administration',
        title: strRoute["institution-administration-panel"].title,
        route: '/panel/' + strRoute["institution-administration-panel"].route,
        icon: 'fa-institution',
    },

    //*******************************************************************
    // Institution > Building
    //*******************************************************************
    "institution-administration-panel/building-list": {
        name: "institution-administration-panel/building-list",
        moduleName: 'building-list',
        title: strRoute["institution-administration-panel/building-list"].title,
        route: '/panel/' + strRoute["institution-administration-panel/building-list"].route,
    },
    "institution-administration-panel/building-new": {
        name: "institution-administration-panel/building-new",
        moduleName: 'building-new',
        title: strRoute["institution-administration-panel/building-new"].title,
        route: '/panel/' + strRoute["institution-administration-panel/building-new"].route,
    },
    "institution-administration-panel/building-edit": {
        name: "institution-administration-panel/building-edit",
        moduleName: 'building-edit',
        title: strRoute["institution-administration-panel/building-edit"].title,
        route: '/panel/' + strRoute["institution-administration-panel/building-edit"].route,
    },


    //*******************************************************************
    // Institution > Campus
    //*******************************************************************
    "institution-administration-panel/campus-list": {
        name: "institution-administration-panel/campus-list",
        moduleName: 'campus-list',
        title: strRoute["institution-administration-panel/campus-list"].title,
        route: '/panel/' + strRoute["institution-administration-panel/campus-list"].route,
    },
    "institution-administration-panel/campus-new": {
        name: "institution-administration-panel/campus-new",
        moduleName: 'campus-new',
        title: strRoute["institution-administration-panel/campus-new"].title,
        route: '/panel/' + strRoute["institution-administration-panel/campus-new"].route,
    },
    "institution-administration-panel/campus-edit": {
        name: "institution-administration-panel/campus-edit",
        moduleName: 'campus-edit',
        title: strRoute["institution-administration-panel/campus-edit"].title,
        route: '/panel/' + strRoute["institution-administration-panel/campus-edit"].route,
    },

    //*******************************************************************
    // Institution > Academic Unit
    //*******************************************************************
    "institution-administration-panel/academic-unit-list": {
        name: "institution-administration-panel/academic-unit-list",
        moduleName: 'academic-unit-list',
        title: strRoute["institution-administration-panel/academic-unit-list"].title,
        route: '/panel/' + strRoute["institution-administration-panel/academic-unit-list"].route,
    },
    "institution-administration-panel/academic-unit-new": {
        name: "institution-administration-panel/academic-unit-new",
        moduleName: 'academic-unit-new',
        title: strRoute["institution-administration-panel/academic-unit-new"].title,
        route: '/panel/' + strRoute["institution-administration-panel/academic-unit-new"].route,
    },
    "institution-administration-panel/academic-unit-edit": {
        name: "institution-administration-panel/academic-unit-edit",
        moduleName: 'academic-unit-edit',
        title: strRoute["institution-administration-panel/academic-unit-edit"].title,
        route: '/panel/' + strRoute["institution-administration-panel/academic-unit-edit"].route,
    },

    //*******************************************************************
    // Institution > Academic Programme
    //*******************************************************************
    "institution-administration-panel/academic-programme-list": {
        name: "institution-administration-panel/academic-programme-list",
        moduleName: 'academic-programme-list',
        title: strRoute["institution-administration-panel/academic-programme-list"].title,
        route: '/panel/' + strRoute["institution-administration-panel/academic-programme-list"].route,
    },
    "institution-administration-panel/academic-programme-new": {
        name: "institution-administration-panel/academic-programme-new",
        moduleName: 'academic-programme-new',
        title: strRoute["institution-administration-panel/academic-programme-new"].title,
        route: '/panel/' + strRoute["institution-administration-panel/academic-programme-new"].route,
    },
    "institution-administration-panel/academic-programme-edit": {
        name: "institution-administration-panel/academic-programme-edit",
        moduleName: 'academic-programme-edit',
        title: strRoute["institution-administration-panel/academic-programme-edit"].title,
        route: '/panel/' + strRoute["institution-administration-panel/academic-programme-edit"].route,
    },

    //*******************************************************************
    // Institution > Room
    //*******************************************************************
    "institution-administration-panel/room-list": {
        name: "institution-administration-panel/room-list",
        moduleName: 'room-list',
        title: strRoute["institution-administration-panel/room-list"].title,
        route: '/panel/' + strRoute["institution-administration-panel/room-list"].route,
    },
    "institution-administration-panel/room-new": {
        name: "institution-administration-panel/room-new",
        moduleName: 'room-new',
        title: strRoute["institution-administration-panel/room-new"].title,
        route: '/panel/' + strRoute["institution-administration-panel/room-new"].route,
    },
    "institution-administration-panel/room-edit": {
        name: "institution-administration-panel/room-edit",
        moduleName: 'room-edit',
        title: strRoute["institution-administration-panel/room-edit"].title,
        route: '/panel/' + strRoute["institution-administration-panel/room-edit"].route,
    },

    //*******************************************************************
    // Institution > Courses
    //*******************************************************************
    "institution-administration-panel/course-list": {
        name: "institution-administration-panel/course-list",
        moduleName: 'course-list',
        title: strRoute["institution-administration-panel/course-list"].title,
        route: '/panel/' + strRoute["institution-administration-panel/course-list"].route,
    },
    "institution-administration-panel/course-new": {
        name: "institution-administration-panel/course-new",
        moduleName: 'course-new',
        title: strRoute["institution-administration-panel/course-new"].title,
        route: '/panel/' + strRoute["institution-administration-panel/course-new"].route,
    },
    "institution-administration-panel/course-edit": {
        name: "institution-administration-panel/course-edit",
        moduleName: 'course-edit',
        title: strRoute["institution-administration-panel/course-edit"].title,
        route: '/panel/' + strRoute["institution-administration-panel/course-edit"].route,
    },

    //*******************************************************************
    // Institution > Course Plan
    //*******************************************************************
    "institution-administration-panel/course-plan-list": {
        name: "institution-administration-panel/course-plan-list",
        moduleName: 'course-plan-list',
        title: strRoute["institution-administration-panel/course-plan-list"].title,
        route: '/panel/' + strRoute["institution-administration-panel/course-plan-list"].route,
    },
    "institution-administration-panel/course-plan-new": {
        name: "institution-administration-panel/course-plan-new",
        moduleName: 'course-plan-new',
        title: strRoute["institution-administration-panel/course-plan-new"].title,
        route: '/panel/' + strRoute["institution-administration-panel/course-plan-new"].route,
    },
    "institution-administration-panel/course-plan-edit": {
        name: "institution-administration-panel/course-plan-edit",
        moduleName: 'course-plan-edit',
        title: strRoute["institution-administration-panel/course-plan-edit"].title,
        route: '/panel/' + strRoute["institution-administration-panel/course-plan-edit"].route,
    },

    //*******************************************************************
    // Institution > Course Iteration
    //*******************************************************************
    "institution-administration-panel/course-iteration-list": {
        name: "institution-administration-panel/course-iteration-list",
        moduleName: 'course-iteration-list',
        title: strRoute["institution-administration-panel/course-iteration-list"].title,
        route: '/panel/' + strRoute["institution-administration-panel/course-iteration-list"].route,
    },
    "institution-administration-panel/course-iteration-new": {
        name: "institution-administration-panel/course-iteration-new",
        moduleName: 'course-iteration-new',
        title: strRoute["institution-administration-panel/course-iteration-new"].title,
        route: '/panel/' + strRoute["institution-administration-panel/course-iteration-new"].route,
    },
    "institution-administration-panel/course-iteration-edit": {
        name: "institution-administration-panel/course-iteration-edit",
        moduleName: 'course-iteration-edit',
        title: strRoute["institution-administration-panel/course-iteration-edit"].title,
        route: '/panel/' + strRoute["institution-administration-panel/course-iteration-edit"].route,
    },

    //*******************************************************************
    // Institution > Department List
    //*******************************************************************
    "institution-administration-panel/department-list": {
        name: "institution-administration-panel/department-list",
        moduleName: 'department-list',
        title: strRoute["institution-administration-panel/department-list"].title,
        route: '/panel/' + strRoute["institution-administration-panel/department-list"].route,
    },
    "institution-administration-panel/department-new": {
        name: "institution-administration-panel/department-new",
        moduleName: 'department-new',
        title: strRoute["institution-administration-panel/department-new"].title,
        route: '/panel/' + strRoute["institution-administration-panel/department-new"].route,
    },
    "institution-administration-panel/department-edit": {
        name: "institution-administration-panel/department-edit",
        moduleName: 'department-edit',
        title: strRoute["institution-administration-panel/department-edit"].title,
        route: '/panel/' + strRoute["institution-administration-panel/department-edit"].route,
    },

    //*******************************************************************
    // Institution > Settings
    //*******************************************************************
    "institution-administration-panel/institution-settings": {
        name: "institution-administration-panel/institution-settings",
        moduleName: 'institution.settings',
        title: strRoute["institution-administration-panel/institution-settings"].title,
        route: '/panel/' + strRoute["institution-administration-panel/institution-settings"].route,
    },

    //*******************************************************************
    // Academic Calendar Settings
    //*******************************************************************

    "academic/calendar-settings": {
        name: "academic/calendar-settings",
        moduleName: 'academic-calendar-settings',
        title: strRoute["academic/calendar-settings"].title,
        route: '/panel/' + strRoute["academic/calendar-settings"].route,
        icon: 'fa-bar-chart',
    },

};

const pages = [
    {
        ...info['institution-administration-panel'],
        noClick: true,
        children: [
            {
                ...info["institution-administration-panel/building-list"],
                hideChildrenInMenu: true,
                children: [
                    {...info["institution-administration-panel/building-new"]},
                    {...info["institution-administration-panel/building-edit"]},
                ]
            },
            {
                ...info["institution-administration-panel/campus-list"],
                hideChildrenInMenu: true,
                children: [
                    {...info["institution-administration-panel/campus-new"]},
                    {...info["institution-administration-panel/campus-edit"]},
                ]
            },
            {
                ...info["institution-administration-panel/department-list"],
                hideChildrenInMenu: true,
                children: [
                    {...info["institution-administration-panel/department-new"]},
                    {...info["institution-administration-panel/department-edit"]},
                ]
            },
            {
                ...info["institution-administration-panel/academic-unit-list"],
                hideChildrenInMenu: true,
                children: [
                    {...info["institution-administration-panel/academic-unit-new"]},
                    {...info["institution-administration-panel/academic-unit-edit"]},
                ]
            },
            {
                ...info["institution-administration-panel/academic-programme-list"],
                hideChildrenInMenu: true,
                children: [
                    {...info["institution-administration-panel/academic-programme-new"]},
                    {...info["institution-administration-panel/academic-programme-edit"]},
                ]
            },
            {
                ...info["institution-administration-panel/room-list"],
                hideChildrenInMenu: true,
                children: [
                    {...info["institution-administration-panel/room-new"]},
                    {...info["institution-administration-panel/room-edit"]},
                ]
            },
            {
                ...info["institution-administration-panel/course-list"],
                hideChildrenInMenu: true,
                children: [
                    {...info["institution-administration-panel/course-new"]},
                    {...info["institution-administration-panel/course-edit"]},
                ]
            },
            {
                ...info["institution-administration-panel/course-plan-list"],
                hideChildrenInMenu: true,
                children: [
                    {...info["institution-administration-panel/course-plan-new"]},
                    {...info["institution-administration-panel/course-plan-edit"]},
                ]
            },
            {
                ...info["institution-administration-panel/course-iteration-list"],
                hideChildrenInMenu: true,
                children: [
                    {...info["institution-administration-panel/course-iteration-new"]},
                    {...info["institution-administration-panel/course-iteration-edit"]},
                ]
            },
            {
                ...info['institution-administration-panel/institution-settings'],
                children: []
            },
        ]
    },
    {
        ...info['academic/calendar-settings'],
        children: [],
    }

];




export {
    info,
    pages,
};