import { Barbecue } from "@/common/types"

export const BarbecueHeader = ({ description, date, observation }: Barbecue) => {
  const eventDate = new Date(date.toString())
  return (
    <div className="flex flex-col">
      <strong>{eventDate.toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' })}</strong>
      <strong>{description}</strong>
      <small className="text-gray-400">{observation}</small>
    </div>
  )

}
