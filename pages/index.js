import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import VipList from '@/components/VipList';
import HeadingWithFilter from '@/components/HeadingWithFilter';
import { API_URL } from '@/config/index';
import { upcomingIn, late } from '@/utils/index';

export default function HomePage({ vips }) {
  const [minutes, setMinutes] = useState(15);
  const [upcomingVips, setUpcomingVips] = useState(vips);
  const [vipDisplay, setVipDisplay] = useState([]);
  const [filter, setFilter] = useState('upcoming');
  const [currentPage, setCurrentPage] = useState(1);
  const [vipsPerPage, setVipsPerPage] = useState(10);

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
    setCurrentPage(1);
  }, [filter, minutes, upcomingVips]);

  const currentVipsDisplay = (currentPage, vipsPerPage) => {
    if (!vipsPerPage) {
      return [];
    }
    const indexOfLastVips = currentPage * vipsPerPage;
    const indexOfFirstVips = indexOfLastVips - vipsPerPage;
    return vipDisplay.slice(indexOfFirstVips, indexOfLastVips);
  };

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
      <HeadingWithFilter
        filter={filter}
        minutes={minutes}
        setFilter={setFilter}
        setMinutes={setMinutes}
      />

      <VipList
        currentVipsDisplay={currentVipsDisplay(currentPage, vipsPerPage)}
        onClickArrivedHandler={onClickArrivedHandler}
      />

      <Pagination
        vipsPerPage={vipsPerPage}
        totalVips={vipDisplay.length}
        paginate={(pageNumber) => setCurrentPage(pageNumber)}
        changeLimit={(limit) => setVipsPerPage(limit)}
      />
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
