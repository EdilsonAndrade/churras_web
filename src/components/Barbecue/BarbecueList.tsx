import { Barbecue, Participant } from '@/common/types';
import Card from '@/components/Barbecue/Card';
import { EmptyCard } from '@/components/Barbecue/EmptyCard';
import { setBarbecues } from '@/redux/reducers/barbecueReducer';
import { setParticipant } from '@/redux/reducers/participantReducer';
import { RootState } from '@/redux/store';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewBarbecueEvent } from './BarbecueForm';
const apiRoute = process.env.NEXT_PUBLIC_API_URL;

export const BarbecueList = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const barbecueState = useSelector((state: RootState) => state.barbecue);
  const barbecues = barbecueState.barbecues;

  const eventsCount = barbecues?.length;
  const [showAddNewEvent, setShowAddNewEvent] = useState(false);

  const handleNavigateToBarbecueDetail = (id: string) => {
    route.push({
      pathname: '/barbecue/[barbecueId]',
      query: { barbecueId: id },
    });
  };

  useEffect(() => {
    async function getBarbecues() {
      const response = await fetch(apiRoute + '/barbecue');
      const data = (await response.json()) as {
        barbecues: Barbecue[];
        participants: Participant[];
      };
      dispatch(setBarbecues(data.barbecues));
      dispatch(setParticipant(data.participants));
    }

    getBarbecues();
  }, [dispatch]);

  return (
    <div
      className={classNames('grid absolute -top-10', {
        'grid-cols-1': !eventsCount,
        'mobile:grid-cols-1 tablet:grid-cols-2 gap-3':
          !!eventsCount && !showAddNewEvent,
      })}
    >
      {!showAddNewEvent ? (
        <>
          {barbecues?.length > 0 &&
            barbecues.map((barbecue) => {
              const { id, date, description, observation } = barbecue;
              return (
                <Card
                  id={id}
                  onClick={() => handleNavigateToBarbecueDetail(id)}
                  key={id}
                  date={date}
                  description={description}
                  observation={observation}
                />
              );
            })}
          <EmptyCard
            onClick={() => {
              setShowAddNewEvent(!showAddNewEvent);
            }}
          />
        </>
      ) : (
        <NewBarbecueEvent
          onClose={() => {
            setShowAddNewEvent(!showAddNewEvent);
          }}
        />
      )}
    </div>
  );
};
