import Link from 'next/link';
import Image from 'next/image';
import ArrivalToggle from './ArrivalToggle';
import { late } from '@/utils/index';

export default function VipList({
  currentVipsDisplay,
  onChangeArrivedHandler,
}) {
  return (
    <div className="mx-20 my-10">
      {currentVipsDisplay.length === 0 ? (
        <h3>No VIPs to show</h3>
      ) : (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Name
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Country
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                ETA
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentVipsDisplay.map((vip) => (
              <tr
                key={vip.id}
                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
              >
                <Link href={`/vips/${vip.id}`} passHref>
                  <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static cursor-pointer">
                    <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                      Name
                    </span>
                    {vip.name}{' '}
                    <Image
                      src={vip.photo}
                      height={30}
                      width={30}
                      alt={`${vip.name}'s photo`}
                      className="rounded-full"
                    />
                  </td>
                </Link>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Country
                  </span>
                  {vip.country_of_origin}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    ETA
                  </span>
                  {new Date(vip.eta.replace(/\s/, 'T') + 'Z').toLocaleString(
                    'ja-JP',
                    {
                      timeZone: 'Asia/Tokyo',
                    },
                  )}{' '}
                  {late(vip) && (
                    <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold text-white">
                      LATE
                    </span>
                  )}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                    Status
                  </span>
                  <ArrivalToggle
                    onChangeArrivedHandler={onChangeArrivedHandler}
                    vip={vip}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
