import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { late } from '@/utils/index';

export default function VipPage({ vip }) {
  console.log(vip.arrived);
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
          <Link href="/">
            <a className="text-blue-500">{'<Back'}</a>
          </Link>
          <div className="p-4 border-b flex justify-between">
            <div>
              <h2 className="text-2xl ">VIP Information</h2>
            </div>
            <span
              className={`${
                vip.arrived ? 'bg-green-500' : 'bg-yellow-600'
              } px-2 pt-1 rounded-full text-center font-bold shadow text-white`}
            >
              {vip.arrived ? 'ARRIVED' : 'UPCOMING'}
            </span>
          </div>
          <div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <Image
                className="object-cover"
                src={vip.photo}
                width={328}
                height={328}
                alt={`photo of ${vip.name}`}
              ></Image>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Name</p>
              <p>{vip.name}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Country of Origin</p>
              <p>{vip.country_of_origin}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">ETA</p>
              <p>
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
              </p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Attributes</p>
              <ul className="list-disc">
                {vip.attributes.map((attributes, index) => (
                  <li key={index}>{attributes}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/vips`);
  const vips = await res.json();

  const paths = vips.map((vip) => ({
    params: { id: vip.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/vips/${id}`);
  const vip = await res.json();

  return {
    props: {
      vip: vip,
    },
    revalidate: 1,
  };
}
