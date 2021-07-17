import Link from 'next/link';
import { late } from '@/utils/index';

export default function VipList({ currentVipsDisplay, onClickArrivedHandler }) {
  return (
    <div>
      {currentVipsDisplay.length === 0 && <h3>No VIPs to show</h3>}

      <ul>
        {currentVipsDisplay.map((vip) => (
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
    </div>
  );
}
