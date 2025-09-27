/** @format */
import {
  CalendarComponent,
  ContactsComponent,
  ReminderComponent,
} from "../components";

const Dashboard = () => {
  return (
    <main className="flex-1 p-6 lg:p-10">
      {/* <h1 className="text-3xl md:text-4xl font-bold mb-8">Dashboard</h1> */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(250px,1fr)_minmax(400px,2fr)_minmax(250px,1fr)] gap-8">
        <ContactsComponent />
        <CalendarComponent />
        <ReminderComponent />
      </div>
    </main>
  );
};

export default Dashboard;
