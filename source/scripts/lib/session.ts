import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, SessionType } from 'scripts/types';
import { setSessionAction, setAlertAction } from 'scripts/store';

export const isValidSession = () => {
  const dispatch = useDispatch();
  const session = useSelector<RootState, SessionType>(
    state => state.sessionState,
  );

  const currentDate = new Date();

  useEffect(() => {
    if (session) {
      // Not Valid

      const checkTimer = new Date(session.expires);

      if (currentDate > checkTimer) {
        dispatch(
          setAlertAction({
            type: 'notice',
            text: 'You session has expired. Please login for your security.',
          }),
        );

        dispatch(setSessionAction(null));
      } else {
        // Extend

        checkTimer.setMinutes(checkTimer.getMinutes() - 15);

        if (currentDate > new Date(checkTimer)) {
          const expiredDate = new Date();
          expiredDate.setMinutes(expiredDate.getMinutes() + 30);

          dispatch(
            setSessionAction({
              time: getSessionTime(),
              token: session.token,
              expires: new Date(expiredDate),
              valid: true,
            }),
          );
        }
      }
    }
  }, [session, currentDate]);
};

export function getSessionTime() {
  const now = new Date();
  return new Date(now.getTime() + 30 * 60000);
}
