import { Map } from 'immutable'


//========================== STATE
const initialState = Map({
	summary: false,
	locations: false,
	cache: [],
	locationsCache: [],
});


//========================== ENUMS
export const SET_SUMMARY = 'SET_SUMMARY';
export const SET_CACHE = 'SET_CACHE';
export const SET_LOCATIONS = 'SET_LOCATIONS';
export const SET_LOCATIONS_CACHE = 'SET_LOCATIONS_CACHE';


//========================== GETTERS
export const getSummary = state => state.get('summary');
export const getCache = state => state.get('cache');
export const getLocations = state => state.get('locations');
export const getLocationsCache = state => state.get('locationsCache');


//========================== SETTERS
export const setSummary = newSummary => dispatch => dispatch({
	type: SET_SUMMARY,
	newSummary,
});

export const setCache = newCache => dispatch => dispatch({
	type: SET_CACHE,
	newCache,
});

export const setLocationsCache = newCache => dispatch => dispatch({
	type: SET_LOCATIONS_CACHE,
	newCache,
});

export const setLocations = newLocations => dispatch => dispatch({
	type: SET_LOCATIONS,
	newLocations,
});


//========================== REDUCER
export let reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SUMMARY:
			return 	state.set('summary', action.newSummary);
		
		case SET_CACHE:
			return 	state.set('cache', action.newCache);

		case SET_LOCATIONS_CACHE:
			return 	state.set('locationsCache', action.newCache);
		
		case SET_LOCATIONS:
			return 	state.set('locations', action.newLocations);

		default:
			return state;
	}
}