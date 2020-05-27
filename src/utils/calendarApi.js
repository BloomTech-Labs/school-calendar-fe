// TODO: make calendarId dynamic to allows user to choose which calendar to use
const calendarApi = gapi => ({
  listEvents: async () => {
    const data = await gapi.calendar.events.list({
      calendarId: 'primary', // controls which calendar to show
      timeMin: new Date().toISOString(), // controls the range of dates to show events from
      maxResults: 50, // controls the amount of events to show
      singleEvents: true,
      orderBy: 'startTime'
    });
    return data.result.items;
  },
  addEvent: resource => {
    // renaming the fields to fit gapi format
    resource.summary = resource.title;
    resource.description = resource.notes;
    // inserting created event to gapi
    const data = gapi.calendar.events.insert({
      calendarId: 'primary', // controls which calendar to show
      resource
    });
    return data.execute(resource => {
      console.log('from addEvent', resource);
    });
  }
});

export default calendarApi;
