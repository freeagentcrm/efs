(async function (inputs, context) {
  const { auth_header } = inputs;
  const { clientId } = context.integrationConfig;
  const { axios, get } = context.libs;
  try {
    const seq_id = get(inputs, 'seq_id');
    if (seq_id.value === null) {
      throw new Error("Please provide the Center's FreeAgent Seq ID", {
        cause: seq_id,
      });
    }
    requestData = {
      code: seq_id,
    };

    const name = get(inputs, 'name');
    if (name.value === null) {
      throw new Error("Please provide the Center's Name", {
        name: name,
      });
    }
    requestData = {
      ...requestData,
      name: name,
    };

    const user_emails = get(inputs, 'user_emails');
    if (user_emails.value === null) {
      // throw new Error("Please provide the Staff's ", {
      //   cause: user_emails,
      // });
    } else {
      requestData = {
        ...requestData,
        user_emails: user_emails,
      };
    }
    const config = {
      method: 'post',
      url: `https://api.eloomi.com/v3/users-email/`,
      headers: {
        ClientId: clientId,
        Authorization: auth_header,
      },
      data: JSON.stringify(requestData),
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
