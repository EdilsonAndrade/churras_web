import { Barbecue } from "@/common/types"

export const BarbecueHeader = ({ description, date, observation }: Barbecue) => (
  <div className="flex flex-col">
    <strong>{date.toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' })}</strong>
    <strong>{description}</strong>
    <small className="text-gray-400">{observation}</small>
  </div>
)
