import EditDriver from "@/components/all-driver/editDriver";
import { getSingleDriver } from "@/lib/driver";

export default async function editDriver({ params }) {
  const id = params.edit;
  const data = await getSingleDriver(id);
  return data ? <EditDriver data={data}></EditDriver> : "";
}
