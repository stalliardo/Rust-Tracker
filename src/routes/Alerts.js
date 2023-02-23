import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useAuth from '../custom-hooks/useAuth';
import { setAlerts } from '../features/alerts/alertsSlice';
import { getAlerts } from '../services/database/alerts';
import ViewActiveAlerts from '../components/alertsPage/ViewActiveAlerts';

const Alerts = () => {

  const alerts = useSelector(state => state.alerts.data);
  const { id } = useAuth();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!alerts.length) {
      getAlerts(id).then((res) => {
        dispatch(setAlerts(res));
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  return !isLoading && <ViewActiveAlerts />
}

export default Alerts;