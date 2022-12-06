(async function (inputs, context) {
  const { auth_header } = inputs;
  const { clientId } = context.integrationConfig;
  const { axios, get } = context.libs;
  try {
    const seq_id = get(inputs, 'seq_id');
    if (seq_id.value === null) {
      throw new Error('Please provide an FreeAgent Seq Id', {
        cause: seq_id,
      });
    }

    const config = {
      method: 'get',
      url: `https://api.eloomi.com/v3/units-code/${seq_id}`,
      headers: {
        ClientId: clientId,
        Authorization: auth_header,
      },
    };

    const response = await axios(config);
    switch (response.status) {
      case 200:
        return {
          response: { ...response.data },
        };
      case 204:
        return {
          response: {
            status: response.statusText,
            status_code: response.status,
            message: null,
            data: {},
          },
        };

      default:
        return {
          response: {
            status: response.statusText,
            status_code: response.status,
            message: null,
            data: {},
          },
        };
    }
  } catch (e) {
    console.error(`${e.name}: ${e.message}`);
    return {
      response: {
        status: e.name,
        status_code: 500,
        message: e.message,
        data: {},
      },
    };
  }
})(inputs, context);
