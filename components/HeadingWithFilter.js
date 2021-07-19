export default function HeadingWithFilter({
  filter,
  minutes,
  setFilter,
  setMinutes,
}) {
  return (
    <h1 className="text-3xl font-bold flex justify-center mt-20">
      <select
        className="font-bold text-blue-800 underline"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="upcoming">Upcoming</option>
        <option value="late">Late</option>
      </select>{' '}
      VIPs
      {filter === 'upcoming' && (
        <>
          {' '}
          in{' '}
          <input
            className="w-16 mx-2 text-blue-800 font-bold"
            type="number"
            value={minutes}
            onChange={(e) => {
              setMinutes(e.target.value);
            }}
          />
          <span> Minutes </span>
        </>
      )}
    </h1>
  );
}
