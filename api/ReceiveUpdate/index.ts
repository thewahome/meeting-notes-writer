import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('Executing webhook endpoint.');
    if (req.query.validationToken) {
        context.log('Validating new subscription');
        context.log('Validating token');

        context.res = {
            headers: {
                'Content-Type': 'text/plain'
            },
            body: req.query.validationToken
        };
    }
    else {
        context.log('Received new notification');
        context.log(JSON.stringify(req.body));
        const name = (req.query.name || (req.body && req.body.name));
        let responseMessage = name
            ? "Hello, " + name + ". This HTTP triggered function executed successfully."
            : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    }
};

export default httpTrigger;