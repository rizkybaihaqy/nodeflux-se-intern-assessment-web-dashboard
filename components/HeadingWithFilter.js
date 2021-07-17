export default function HeadingWithFilter({
  filter,
  minutes,
  setFilter,
  setMinutes,
}) {
  return (
    <h1>
      <select
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
          <span> in </span>
          <input
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
