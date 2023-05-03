# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1: Add custom agent ID field to Agent model & DB schema.
Update the Agent model & DB schema with an optional custom agent ID field for generating reports. 
Make sure existing Agents can have this field added without problems. 
Estimation: 3-4h
Modify the Agent model, add nullable field 'custom_agent_id' (VARCHAR(50) or similar), update schema, apply migration & test it.

Ticket 2: Need API for Facilities to save custom agent IDs.
Facilities API that supports saving custom agent IDs for Agents they work with.
 API should be accessible only by authorized Facilities, save IDs & return success/error msgs. 
 Estimated time is 6 hrs. 
 Implement API endpoint (ex: /api/facilities/agents/custom_id), 
 POST requests with Facility ID, Agent ID, custom agent ID. 
 Validate input, check permissions, save custom agent ID & handle errors.

Ticket 3: Update getShiftsByFacility func, include custom agent IDs.
Update the getShiftsByFacility func so it returns custom agent IDs (if available) with the database IDs. 
Estimation: 7h. 
Modify the func to join Shifts & Agents tables, include custom agent ID field in returned data, update related queries & make sure custom agent ID is in the response.

Ticket 4: Change generateReport func, use custom agent IDs in PDF.
Modify the generateReport func to use custom agent ID (if available) instead of the internal database ID in the PDF report. 
Estimate: 5 hrs. 
Update the func to check for custom agent IDs, use them in the PDF report & make sure it's generated correctly with the custom agent ID.

Ticket 5: Test & document new feature
Test the new custom agent ID functionality across the system & update docs. 
Make sure it works as described in each above task & is explained in the documentation.
Estimation: 5 hrs. 
Create test cases, verify correct behavior, test different scenarios (missing custom agent IDs, invalid input data), and update API documentation & user guides.



