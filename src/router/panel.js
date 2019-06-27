import store from 'src/services/store';
import {loading} from 'src/helper';
import locales from '../locales'

import {AppService} from 'src/services/data/app'

let strRoute = locales[store.state.lang].routes.panel;


// ********************** Panel Components **************************

// Panel Layout
const PanelLayout = r => require.ensure([], () => {
    require('assets/scss/panel/_layout.scss');
    r(require('components/panel/_Layout'));
}, 'panel');

// ***********************************************************

// Panel Dashboard
const PanelDashboardView = r => require.ensure([], () => {
    require('assets/scss/panel/dashboard.scss');
    r(require('components/panel/Dashboard'));
}, 'panel.dashboard');

// ***********************************************************

// Panel Institution Settings
const PanelInstitutionSettingsView = r => require.ensure([], () => {
    require('assets/scss/panel/institution.scss');
    r(require('components/panel/Institution/Settings/Base'));
}, 'panel.institution');

// ***********************************************************

// Panel Building List
const PanelBuildingListView = r => require.ensure([], () => {
    require('assets/scss/panel/building.scss');
    r(require('components/panel/Building/List'))
}, 'panel.building');

// Panel Building Detail
const PanelBuildingDetailView = r => require.ensure([], () => {
    require('assets/scss/panel/building.scss');
    r(require('components/panel/Building/Detail'))
}, 'panel.building');


// ***********************************************************

// Panel Campus List
const PanelCampusListView = r => require.ensure([], () => {
    require('assets/scss/panel/campus.scss');
    r(require('components/panel/Campus/List'))
}, 'panel.campus');

// Panel Campus Detail
const PanelCampusDetailView = r => require.ensure([], () => {
    require('assets/scss/panel/campus.scss');
    r(require('components/panel/Campus/Detail'))
}, 'panel.campus');

// ***********************************************************

// Panel Academic Unit List
const PanelAcademicUnitListView = r => require.ensure([], () => {
    require('assets/scss/panel/academic.scss');
    r(require('components/panel/AcademicUnit/List'))
}, 'panel.academic');

// Panel Academic Unit Detail (panel.academic-unit.detail)
const PanelAcademicUnitDetailView = r => require.ensure([], () => {
    require('assets/scss/panel/academic.scss');
    r(require('components/panel/AcademicUnit/Detail'))
}, 'panel.academic');

// ***********************************************************

// Panel Department List
const PanelDepartmentListView = r => require.ensure([], () => {
    require('assets/scss/panel/department.scss');
    r(require('components/panel/Department/List'))
}, 'panel.department');

// Panel Department Detail
const PanelDepartmentDetailView = r => require.ensure([], () => {
    require('assets/scss/panel/department.scss');
    r(require('components/panel/Department/Detail'))
}, 'panel.department');

// ***********************************************************

// Panel Academic Programme List
const PanelAcademicProgrammeListView = r => require.ensure([], () => {
    require('assets/scss/panel/academic.scss');
    r(require('components/panel/AcademicProgramme/List'))
}, 'panel.academic');

// Panel Academic Programme Detail
const PanelAcademicProgrammeDetailView = r => require.ensure([], () => {
    require('assets/scss/panel/academic.scss');
    r(require('components/panel/AcademicProgramme/Detail'))
}, 'panel.academic');

// ***********************************************************

// Panel Room List
const PanelRoomListView = r => require.ensure([], () => {
    require('assets/scss/panel/room.scss');
    r(require('components/panel/Room/List'))
}, 'panel.room');

// Panel Room Detail
const PanelRoomDetailView = r => require.ensure([], () => {
    require('assets/scss/panel/room.scss');
    r(require('components/panel/Room/Detail'))
}, 'panel.room');

// ***********************************************************

// Panel Courses List
const PanelCourseListView = r => require.ensure([], () => {
    require('assets/scss/panel/course.scss');
    r(require('components/panel/Course/List'))
}, 'panel.course');

// Panel Course Detail
const PanelCourseDetailView = r => require.ensure([], () => {
    require('assets/scss/panel/course.scss');
    r(require('components/panel/Course/Detail'))
}, 'panel.course');

// ***********************************************************

// Panel Course Plan List
const PanelCoursePlanListView = r => require.ensure([], () => {
    require('assets/scss/panel/course-plan.scss');
    r(require('components/panel/CoursePlan/List'))
}, 'panel.course');

// Panel Course Plan Detail
const PanelCoursePlanDetailView = r => require.ensure([], () => {
    require('assets/scss/panel/course-plan.scss');
    r(require('components/panel/CoursePlan/Detail'))
}, 'panel.course');

// ***********************************************************

// Panel Course Iteration List
const PanelCourseIterationListView = r => require.ensure([], () => {
    require('assets/scss/panel/course-iteration.scss');
    r(require('components/panel/CourseIteration/List'))
}, 'panel.course');

// Panel Course Iteration Detail
const PanelCourseIterationDetailView = r => require.ensure([], () => {
    require('assets/scss/panel/course-iteration.scss');
    r(require('components/panel/CourseIteration/Detail'))
}, 'panel.course');

// ***********************************************************

// Panel Academic Calendar Settings (panel.academic)
const PanelAcademicCalendarSettingsView = r => require.ensure([], () => {
    require('assets/scss/panel/academic.scss');
    r(require('components/panel/Academic/CalendarSettings'));
}, 'panel.academic');



let routes = {
    path: '/panel',
    component: PanelLayout,

    beforeEnter: (to, from, next) => {
        if (store.state.token) {
            store.setToken(store.state.token);

            loading.show(store.state.i18n.t("text.loading-app-init"));

            AppService.getInit()
                .then(res => {
                    if (res.code == 200) {
                        store.state.appInfo = res.result.set;
                        return AppService.getLanguages();
                    }

                })
                .then(res => {
                    loading.hide();

                    if (res.code == 200) {
                        store.state.appInfo.languages = res.result.set;

                        store.state.appInfo.langTitle = {};

                        store.state.appInfo.languages.map(lang => {
                            store.state.appInfo.langTitle[lang.code2] = lang.name[store.state.lang];
                        });

                        next();
                    }

                })
                .catch(err => {
                    if (err.code !== 401) {
                        loading.hide();
                    }
                })
        } else {
            // Redirect Login
            next({
                path: '/',
                query: {
                    redirectPanel: to.path,
                }
            });
        }
    },
    
    children: [
        {
            name: 'dashboard',
            path: "/",
            component: PanelDashboardView,
        },
        {
            name: 'student-affairs',
            path: strRoute["student-affairs"].route,
            component: PanelDashboardView,
        },
        {
            name: 'student-affairs/student-lesson-operations',
            path: strRoute["student-affairs/student-lesson-operations"].route,
            component: PanelDashboardView,
        },
        {
            name: 'student-affairs/student-lesson-operations/add-student-lesson',
            path: strRoute["student-affairs/student-lesson-operations/add-student-lesson"].route,
            component: PanelDashboardView,
        },
        {
            name: 'student-affairs/add-student',
            path: strRoute["student-affairs/add-student"].route,
            component: PanelDashboardView,
        },
        //*********************************************************
        {
            name: 'discipline-operations',
            path: strRoute["discipline-operations"].route,
            component: PanelDashboardView,
        },
        {
            name: 'lesson-operations',
            path: strRoute["lesson-operations"].route,
            component: PanelDashboardView,
        },
        {
            name: 'bologna-process-management',
            path: strRoute["bologna-process-management"].route,
            component: PanelDashboardView
        },
        {
            name: 'member-operations',
            path: strRoute["member-operations"].route,
            component: PanelDashboardView,
        },
        {
            name: 'staff-operations',
            path: strRoute["staff-operations"].route,
            component: PanelDashboardView,
        },
        {
            name: 'dashboard-screens',
            path: strRoute["dashboard-screens"].route,
            component: PanelDashboardView,
        },
        //********************************************************
        {
            name: 'institution-administration-panel',
            path: strRoute["institution-administration-panel"].route,
            component: PanelDashboardView,
        },
        // Building ****************************************************************
        {
            name: 'institution-administration-panel/building-list',
            path: strRoute["institution-administration-panel/building-list"].route,
            component: PanelBuildingListView,
        },
        {
            name: 'institution-administration-panel/building-new',
            path: strRoute["institution-administration-panel/building-new"].route,
            component: PanelBuildingDetailView,
        },
        {
            name: 'institution-administration-panel/building-edit',
            path: strRoute["institution-administration-panel/building-edit"].route + "/:id",
            component: PanelBuildingDetailView,
        },
        // Campus ****************************************************************
        {
            name: 'institution-administration-panel/campus-list',
            path: strRoute["institution-administration-panel/campus-list"].route,
            component: PanelCampusListView,
        },
        {
            name: 'institution-administration-panel/campus-new',
            path: strRoute["institution-administration-panel/campus-new"].route,
            component: PanelCampusDetailView,
        },
        {
            name: 'institution-administration-panel/campus-edit',
            path: strRoute["institution-administration-panel/campus-edit"].route + "/:id",
            component: PanelCampusDetailView,
        },
        // Academic Unit ****************************************************************
        {
            name: 'institution-administration-panel/academic-unit-list',
            path: strRoute["institution-administration-panel/academic-unit-list"].route,
            component: PanelAcademicUnitListView,
        },
        {
            name: 'institution-administration-panel/academic-unit-new',
            path: strRoute["institution-administration-panel/academic-unit-new"].route,
            component: PanelAcademicUnitDetailView,
        },
        {
            name: 'institution-administration-panel/academic-unit-edit',
            path: strRoute["institution-administration-panel/academic-unit-edit"].route + "/:id",
            component: PanelAcademicUnitDetailView,
        },
        // Department ****************************************************************
        {
            name: 'institution-administration-panel/department-list',
            path: strRoute["institution-administration-panel/department-list"].route,
            component: PanelDepartmentListView,
        },
        {
            name: 'institution-administration-panel/department-new',
            path: strRoute["institution-administration-panel/department-new"].route,
            component: PanelDepartmentDetailView,
        },
        {
            name: 'institution-administration-panel/department-edit',
            path: strRoute["institution-administration-panel/department-edit"].route + "/:id",
            component: PanelDepartmentDetailView,
        },
        // Academic Programme ****************************************************************
        {
            name: 'institution-administration-panel/academic-programme-list',
            path: strRoute["institution-administration-panel/academic-programme-list"].route,
            component: PanelAcademicProgrammeListView,
        },
        {
            name: 'institution-administration-panel/academic-programme-new',
            path: strRoute["institution-administration-panel/academic-programme-new"].route,
            component: PanelAcademicProgrammeDetailView,
        },
        {
            name: 'institution-administration-panel/academic-programme-edit',
            path: strRoute["institution-administration-panel/academic-programme-edit"].route + "/:id",
            component: PanelAcademicProgrammeDetailView,
        },
        // Room ****************************************************************
        {
            name: 'institution-administration-panel/room-list',
            path: strRoute["institution-administration-panel/room-list"].route,
            component: PanelRoomListView,
        },
        {
            name: 'institution-administration-panel/room-new',
            path: strRoute["institution-administration-panel/room-new"].route,
            component: PanelRoomDetailView,
        },
        {
            name: 'institution-administration-panel/room-edit',
            path: strRoute["institution-administration-panel/room-edit"].route + "/:id",
            component: PanelRoomDetailView,
        },
        // Course ****************************************************************
        {
            name: 'institution-administration-panel/course-list',
            path: strRoute["institution-administration-panel/course-list"].route,
            component: PanelCourseListView,
        },
        {
            name: 'institution-administration-panel/course-new',
            path: strRoute["institution-administration-panel/course-new"].route,
            component: PanelCourseDetailView,
        },
        {
            name: 'institution-administration-panel/course-edit',
            path: strRoute["institution-administration-panel/course-edit"].route + "/:id",
            component: PanelCourseDetailView,
        },
        // Course Plan ****************************************************************
        {
            name: 'institution-administration-panel/course-plan-list',
            path: strRoute["institution-administration-panel/course-plan-list"].route,
            component: PanelCoursePlanListView,
        },
        {
            name: 'institution-administration-panel/course-plan-new',
            path: strRoute["institution-administration-panel/course-plan-new"].route,
            component: PanelCoursePlanDetailView,
        },
        {
            name: 'institution-administration-panel/course-plan-edit',
            path: strRoute["institution-administration-panel/course-plan-edit"].route + "/:id",
            component: PanelCoursePlanDetailView,
        },
        // Course Iteration ****************************************************************
        {
            name: 'institution-administration-panel/course-iteration-list',
            path: strRoute["institution-administration-panel/course-iteration-list"].route,
            component: PanelCourseIterationListView,
        },
        {
            name: 'institution-administration-panel/course-iteration-new',
            path: strRoute["institution-administration-panel/course-iteration-new"].route,
            component: PanelCourseIterationDetailView,
        },
        {
            name: 'institution-administration-panel/course-iteration-edit',
            path: strRoute["institution-administration-panel/course-iteration-edit"].route + "/:id",
            component: PanelCourseIterationDetailView,
        },
        // Institution Settings ****************************************************************
        {
            name: 'institution-administration-panel/institution-settings',
            path: strRoute["institution-administration-panel/institution-settings"].route + "/:tab?/:type?",
            component: PanelInstitutionSettingsView,
        },
        //********************************************************
        {
            name: 'academic/calendar-settings',
            path: strRoute["academic/calendar-settings"].route,
            component: PanelAcademicCalendarSettingsView,
        },
        //********************************************************
        {
            name: 'report-side',
            path: strRoute["report-side"].route,
            component: PanelDashboardView,
        },

    ]
};



routes.children.map(child => {

    child.meta = {
        layout: "panel"
    };

});

export default routes;

