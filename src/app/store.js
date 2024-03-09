import {create} from 'zustand';

const userStore = create(set => ({
  userMail: [],
  tripData: [],
  userAuth: [],
  loading: true,
  authId: '',
  userData: [],
}));

export default userStore;
