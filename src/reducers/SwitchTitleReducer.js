
import { SWITCH_TITLE } from '../actions/SwitchActionCreator'

export default (preIsDepartment = true, {type, payload}) => {
    if (type === SWITCH_TITLE) {
        return payload;
    }
    return preIsDepartment;
}
