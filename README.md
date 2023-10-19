## Installation

```sh
npm install @8glabs/imagine-api
```

## Development

Start:

```sh
import { init } from "@8glabs/imagine-api";

init("APP_ID", "APP_KEY");
```

Create Image:

```sh
import { createImage } from "@8glabs/imagine-api";

const result = await createImage("PROMPT");
```

Get Job By Id:

```sh
import { getJobById } from "@8glabs/imagine-api";

const result = await getJobById("JOB_ID");
```

Get Jobs:

```sh
import { createImage } from "@8glabs/imagine-api";

const result = await getJobs();
```
