import Card from "@/components/Barbecue/Card";
import { EmptyCard } from "@/components/Barbecue/EmptyCard";
import { RootState } from "@/redux/store";
import classNames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NewBarbecueEvent } from "./NewBarbecueEvent";
import { useRouter } from "next/router";

export const BarbecueList = () => {
  const route = useRouter();

  const barbecueState = useSelector((state: RootState) => state.barbecue);
  const barbecues = barbecueState.barbecues;
  const eventsCount = barbecues.length;
  const [showAddNewEvent, setShowAddNewEvent] = useState(false);


  const handleNavigateToBarbecueDetail = (id: string) => {
    route.push({
      pathname: '/barbecue/[barbecueId]',
      query: { barbecueId: id }
    });
  }


  return (
    <div className={classNames("grid absolute -top-10", {
      'grid-cols-1': !eventsCount,
      "grid-cols-2 gap-3": !!eventsCount && !showAddNewEvent
    })}>
      {!showAddNewEvent ?
        <>
          {barbecues.length > 0 && barbecues.map((barbecue) => {
            const { id, date, description, observation } = barbecue;
            return (<Card id={id} onClick={() => handleNavigateToBarbecueDetail(id)} key={id} date={date} description={description} observation={observation} />)
          })}
          <EmptyCard onClick={() => { setShowAddNewEvent(!showAddNewEvent) }} />
        </>
        : (
          <NewBarbecueEvent onClose={() => { setShowAddNewEvent(!showAddNewEvent) }} />
        )}

    </div>
  )
}


