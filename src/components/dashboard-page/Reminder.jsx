import { addMonths, format, isWithinInterval, compareAsc } from "date-fns";
import useAuth from "../../hooks/useAuth.jsx";

const ReminderComponent = () => {
  const { user } = useAuth();

  //********** filter the next 2 months events **********

  const today = new Date();

  const twoMonthsLater = addMonths(today, 2);

  const filteredEvents = user.events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return isWithinInterval(eventDate, { start: today, end: twoMonthsLater });
    })
    .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));

  return (
    <div className="bg-base-200 p-4 rounded-xl flex flex-col gap-6 shadow-md min-w-[300px]">
      <div>
        <div className="divider divider-primary "></div>
        <h3 className="text-lg font-bold mb-4 text-center">Pinned</h3>
        <div className="divider divider-primary "></div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-background-light dark:bg-background-dark shadow-sm">
            <div className="flex-1">
              <p className="font-bold">Mother's Day</p>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                May 12
              </p>
            </div>
            <div className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvPSQKPGXCnWbLY35gfN4kooPIpbnyxt-oaqWBmhjmLdxdvXhGqJbKlB8PxPcnbcNWEUdFBf8y8n5u2kWlMRgO56AOe95_eJ2AFig4rG2TmLZDdZtEJzL8Py9h1fu9HA0SP7SJLL7gX5v-7rsyCqzyE6ocNnQBFNXrqcR0TDTnZoKeFi9wXy7N27TJ29XpdTjB6YFnulgCba2kXXU2CejP7fD-5o_7p8exurdt8obuep_pKXhoDca0Etzb52CaMlFoqCqO4pmTTYPh')]"></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="divider divider-primary "></div>
        <h3 className="text-lg font-bold mb-4 text-center">
          Events in the next 2 months
        </h3>

        <div className="divider divider-primary "></div>
        <div
          className={`space-y-4 overflow-y-auto pr-1`}
          style={{ maxHeight: "450px" }}
        >
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm"
            >
              <div className="flex-1">
                <p className="font-bold">{event.title}</p>
                <p className="text-sm text-muted-light dark:text-muted-dark">
                  {format(new Date(event.date), "dd MMMM yyyy")}
                </p>
              </div>

              <img
                className="h-18 w-18 rounded-full"
                src={event.contact.profile.avatar}
                alt={event.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReminderComponent;
