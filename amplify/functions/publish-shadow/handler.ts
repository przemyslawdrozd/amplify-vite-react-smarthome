import AWS from 'aws-sdk';
import type { APIGatewayProxyHandler } from "aws-lambda";
const ENDPOINT = process.env.ENDPOINT;
const iotdata = new AWS.IotData({ region: 'eu-central-1', endpoint: ENDPOINT });

export const handler: APIGatewayProxyHandler = async (event) => {
    const topic = "$aws/things/RPI4Desk/shadow/update";
    const payload = {
        state: {
            desired: {
                camera: {
                    take_snapshot: true
                },
            }
        }
    };
    
    const params = {
        topic: topic,
        qos: 1,
        payload: JSON.stringify(payload)
    };

    try {
        console.log('publish on', topic)
        const data = await iotdata.publish(params).promise();
        console.log("Success, message published:", data);
        return {
            
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Headers": "*",
              },
            body: JSON.stringify('Message published successfully')
        };
    } catch (err) {
        console.log("Error publishing to IoT topic:", err);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Headers": "*",
              },
            body: JSON.stringify('Failed to publish message')
        };
    }
};
