import member from './member';
import app from './app';
import institution from './institution';
import campus from './campus';
import building from './building';
import academic from './academic';
import department from './department';
import staff from './staff';
import room from './room';
import course from './course';
import courseIteration from './courseIteration';

export default {
    ...app,
    ...member,
    ...institution,
    ...campus,
    ...building,
    ...academic,
    ...department,
    ...staff,
    ...room,
    ...course,
    ...courseIteration,
};