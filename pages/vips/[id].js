import Image from 'next/image';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

export default function VipPage({ vip }) {
  return (
    <Layout>
      <h1>{vip.name}</h1>
      <Image
        src={vip.photo}
        width={128}
        height={128}
        alt={`photo of ${vip.name}`}
      ></Image>
      <p>{vip.country_of_origin}</p>
      <p>
        {new Date(vip.eta.replace(/\s/, 'T') + 'Z').toLocaleString('ja-JP', {
          timeZone: 'Asia/Tokyo',
        })}
      </p>
      <p>{vip.arrived}</p>
      <ul>
        {vip.attributes.map((attributes, index) => (
          <li key={index}>{attributes}</li>
        ))}
      </ul>
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
