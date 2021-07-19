import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function ArrivalToggle({ onClickArrivedHandler, vip }) {
  const [enabled, setEnabled] = useState(vip.arrived);

  const onChangeHandler = (value) => {
    setEnabled(value);
    onClickArrivedHandler(vip, value);
  };

  return (
    <Switch.Group>
      <div className="flex items-center justify-center">
        <Switch.Label className="mr-4">Arrived</Switch.Label>
        <Switch
          checked={enabled}
          onChange={onChangeHandler}
          className={`${
            enabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}
