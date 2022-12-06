(async function (inputs, context) {
  const { auth_header } = inputs;
  const { clientId } = context.integrationConfig;
  const { axios, get } = context.libs;
  try {
    const staffEloomieEmail = get(inputs, 'staffEloomieEmail');
    let requestData = {};
    if (staffEloomieEmail.value === null) {
      throw new Error("Please provide the Staff's Eloomi email address", {
        cause: staffEloomieEmail,
      });
    }
    requestData = {
      email: staffEloomieEmail,
    };
    const staffFirstName = get(inputs, 'staffFirstName');
    if (staffFirstName.value === null) {
      throw new Error("Please provide the Staff's First Name", {
        cause: staffFirstName,
      });
    }
    requestData = {
      ...requestData,
      first_name: staffFirstName,
    };
    const staffLastName = get(inputs, 'staffLastName');
    if (staffLastName.value === null) {
      throw new Error("Please provide the Staff's ", {
        cause: staffLastName,
      });
    }
    requestData = {
      ...requestData,
      last_name: staffLastName,
    };

    const staffPhone = get(inputs, 'staffPhone');
    if (staffPhone.value === null) {
      // throw new Error('Please provide the Staff Phone Number', {
      //   cause: staffPhone,
      // });
    } else {
      requestData = {
        ...requestData,
        mobile_phone: staffPhone,
      };
    }
    const staffTitle = get(inputs, 'staffTitle');
    if (staffTitle.value === null) {
      // throw new Error('Please provide a Staff Title', {
      //   cause: staffTitle,
      // });
    } else {
      requestData = {
        ...requestData,
        title: staffTitle,
      };
    }
    const eloomieCenterId = get(inputs, 'eloomieCenterId');
    if (eloomieCenterId.value === null) {
      throw new Error('Please provide an Eloomi Center Id', {
        cause: eloomieCenterId,
      });
    }
    requestData = {
      ...requestData,
      department_id: eloomieCenterId,
    };

    const config = {
      method: 'patch',
      url: `https://api.eloomi.com/v3/users-email/${eloomieEmail}`,
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
