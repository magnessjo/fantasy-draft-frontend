import { useSelector, useDispatch } from 'react-redux';
import { RootState, SessionType } from 'scripts/types';
import { setSessionAction, setAlertAction } from 'scripts/store';

export const isValidSession = () => {
  const dispatch = useDispatch();
  const session = useSelector<RootState, SessionType>(
    state => state.sessionState,
  );

  if (!session) return false;

  // Valid Session

  const sessionDate = new Date(session.time);
  const currentDate = new Date();

  if (sessionDate.getTime() > currentDate.getTime()) {
    const checkTimer = new Date(currentDate.getTime() + 15 * 60000);

    if (checkTimer.getTime() > sessionDate.getTime()) {
      dispatch(
        setSessionAction({
          time: getSessionTime(),
        }),
      );
    }

    return true;
  }

  // Not Valid

  dispatch(
    setAlertAction({
      type: 'notice',
      text: 'You session has expired. Please login for your security.',
    }),
  );

  dispatch(setSessionAction(null));

  return false;
};

export function getSessionTime() {
  const now = new Date();
  return new Date(now.getTime() + 30 * 60000);
}
