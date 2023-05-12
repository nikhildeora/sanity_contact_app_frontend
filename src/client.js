import {createClient} from "@sanity/client";

export const client = createClient({
    projectId : "w9t66qvn",
    dataset : "production",
    apiVersion : "v2021-10-21",
    useCdn : true, 
    token : 'sk1V5YtbaSfAQUGkmg6oEHY96UQOIva13j3RDS7QG4a7PGgJ7t4unSod9KScD9zQg69OXJj4qd9CM1C9OhCZ7qbTZppwKpgkP9tgGqvAdDRApfBWM10eeNgbzWUqIJl1c9xX5hl18U6f1BRPYVmMl6X6XCuFzzPUmpcpxoJm5RylCpfhmCD6' 
}) 