export default function Pagination({
  vipsPerPage,
  totalVips,
  paginate,
  changeLimit,
}) {
  const pageNumbers = [];

  if (vipsPerPage) {
    for (let i = 1; i <= Math.ceil(totalVips / vipsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <>
      <label htmlFor="per-page">VIP Per Page</label>
      <input
        name="per-page"
        type="number"
        value={vipsPerPage}
        onChange={(e) => {
          if (e.target.value > 0) {
            changeLimit(e.target.value);
          }
        }}
      />
      <nav>
        <ul>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
