import EditDriver from "@/components/all-driver/editDriver";
import { getSingleDriver } from "@/lib/driver";

export default async function editDriver({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.edit;
  const data = await getSingleDriver(id);
  return data ? <EditDriver data={data}></EditDriver> : "";
}
