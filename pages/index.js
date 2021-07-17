import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { upcomingIn, late } from 'utils';

export default function HomePage({ vips }) {
  const [minutes, setMinutes] = useState(15);
  const [upcomingVips, setUpcomingVips] = useState(vips);
  const [vipDisplay, setVipDisplay] = useState([]);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    (async () => {
      switch (filter) {
        case 'upcoming':
          setVipDisplay(upcomingVips.filter(upcomingIn(minutes)));
          break;

        case 'late':
          setVipDisplay(upcomingVips.filter(late));
          break;

        default:
          const res = await fetch(`${API_URL}/vips?_sort=eta&arrived=true`);
          const arrivedVips = await res.json();
          setVipDisplay([...upcomingVips, ...arrivedVips]);
          break;
      }
    })();
  }, [filter, minutes, upcomingVips]);

  const onClickArrivedHandler = async (id) => {
    const res = await fetch(`${API_URL}/vips/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ arrived: true }),
    });

    if (!res.ok) {
      console.error('Something Went Wrong');
    }

    const newUpcomingVips = [...upcomingVips];
    newUpcomingVips.splice(
      newUpcomingVips.findIndex((vip) => vip.id === id),
      1,
    );
    setUpcomingVips(newUpcomingVips);
  };

  return (
    <Layout>
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

      {vipDisplay.length === 0 && <h3>No VIPs to show</h3>}

      <ul>
        {vipDisplay.map((vip) => (
          <li key={vip.id}>
            <Link href={`/vips/${vip.id}`}>
              <a>
                {vip.name} {late(vip) ? '(late)' : ''}
              </a>
            </Link>
            {' | '}
            {!vip.arrived && (
              <button onClick={() => onClickArrivedHandler(vip.id)}>
                Arrived
              </button>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/vips?_sort=eta&arrived=false`);

  const vips = await res.json();

  return {
    props: {
      vips: vips,
    },
  };
}
