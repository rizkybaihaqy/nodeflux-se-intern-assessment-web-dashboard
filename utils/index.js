export const upcomingIn = (minutes) => {
  return (vip) => {
    const minutesFromNow = new Date(
      new Date().setMinutes(new Date().getMinutes() + minutes),
    );
    const date = new Date(vip.eta.replace(/\s/, 'T') + 'Z');
    return date <= minutesFromNow && vip.arrived === false;
  };
};

export const late = (vip) => {
  const now = new Date();
  const date = new Date(vip.eta.replace(/\s/, 'T') + 'Z');
  return date <= now && vip.arrived === false;
};
