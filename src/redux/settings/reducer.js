
import {defaultLocale} from 'Constants/defaultValues'


const INIT_STATE = {
	...defaultLocale,
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		
		default: return { ...state };
	}
}
