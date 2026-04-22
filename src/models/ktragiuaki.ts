import { Effect, Reducer } from 'umi';
import { getRooms, saveRooms, Room } from '@/services/ktragiuaki';
import type { AnyAction } from 'redux';

export interface RoomState {
    list: Room[];
}

interface RoomModel {
    namespace: 'room';
    state: RoomState;
    reducers: {
        setList: Reducer<RoomState>;
    };
    effects: {
        fetch: Effect;
        add: Effect;
        update: Effect;
        remove: Effect;
    };
}

const model: RoomModel = {
    namespace: 'room',

    state: {
        list: [],
    },

    reducers: {
        setList(state, action: AnyAction) {
            return { ...state!, list: action.payload };
        },
    },

    effects: {
        *fetch(_, { call, put }) {
            const data: Room[] = yield call(getRooms);
            yield put({ type: 'setList', payload: data });
        },

        *add({ payload }, { call, put, select }) {
            const list: Room[] = yield select((state: any) => state.room.list);

            if (list.some((i) => i.id === payload.id)) {
                return Promise.reject(new Error('duplicate'));
            }

            const newList = [...list, payload];
            yield call(saveRooms, newList);
            yield put({ type: 'setList', payload: newList });

            return true;
        },

        *update({ payload }, { call, put, select }) {
            const list: Room[] = yield select((state: any) => state.room.list);

            const newList = list.map((i) =>
                i.id === payload.id ? payload : i
            );

            yield call(saveRooms, newList);
            yield put({ type: 'setList', payload: newList });

            return true;
        },

        *remove({ payload }, { call, put, select }) {
            const list: Room[] = yield select((state: any) => state.room.list);

            const target = list.find((i) => i.id === payload);

            if (target && target.capacity >= 30) {
                return Promise.reject(new Error('capacity')); // 🔥 QUAN TRỌNG
            }

            const newList = list.filter((i) => i.id !== payload);
            yield call(saveRooms, newList);
            yield put({ type: 'setList', payload: newList });

            return true;
        }
    },
};

export default model;