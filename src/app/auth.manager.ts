import { onSessionChange } from '@api/auth.api';
import { useAuthStore } from '@s/auth.store';
import { useProfileStore } from '@s/profile.store';

const startAuthOrchestrator = (): (() => void) => {
  return onSessionChange(async (user) => {
    const currentUser = useAuthStore.getState().user;

    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setAuthInit(true);

    if (currentUser?.id === user?.id) {
      return;
    }
    if (user) {
      // useProfileStore.getState().fetchProfile(user.id);
      //TODO: get data;
    } else {
      useProfileStore.getState().reset();
      //TODO: clear sensitive data
    }
  });
};

startAuthOrchestrator();
