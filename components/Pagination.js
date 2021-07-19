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
    <div className="flex justify-center">
      <div>
        <div className="flex items-center justify-center mb-5">
          <label htmlFor="per-page" className="mr-2 font-bold">
            VIP Per Page
          </label>
          <input
            className="w-20 text-blue-800 font-bold"
            name="per-page"
            type="number"
            value={vipsPerPage}
            onChange={(e) => {
              if (e.target.value > 0) {
                changeLimit(e.target.value);
              }
            }}
          />
        </div>

        <nav>
          <ul className="flex justify-center">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg"
              >
                <button onClick={() => paginate(number)} className="font-bold">
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
