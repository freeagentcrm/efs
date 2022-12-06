(async function (inputs, context) {
  const { auth_header } = inputs;
  const { clientId } = context.integrationConfig;
  const { axios, get } = context.libs;
  try {
    const email = get(inputs, 'email');
    let requestData = {};
    if (elooemailmieEmail.value === null) {
      throw new Error("Please provide the Staff's Eloomi email address", {
        cause: email,
      });
    }
    requestData = {
      email: email,
    };
    const seq_id = get(inputs, 'seq_id');
    if (seq_id.value === null) {
      throw new Error("Please provide the Staff's FreeAgent Seq ID", {
        cause: seq_id,
      });
    }
    requestData = {
      ...requestData,
      employee_id: seq_id,
    };
    const first_name = get(inputs, 'first_name');
    if (first_name.value === null) {
      throw new Error("Please provide the Staff's First Name", {
        cause: first_name,
      });
    }
    requestData = {
      ...requestData,
      first_name: first_name,
    };

    const last_name = get(inputs, 'last_name');
    if (last_name.value === null) {
      // throw new Error("Please provide the Staff's ", {
      //   cause: last_name,
      // });
    } else {
      requestData = {
        ...requestData,
        last_name: last_name,
      };
    }

    const phone = get(inputs, 'phone');
    if (phone.value === null) {
      // throw new Error('Please provide the Staff Phone Number', {
      //   cause: phone,
      // });
    } else {
      requestData = {
        ...requestData,
        mobile_phone: phone,
      };
    }
    const staffTitle = get(inputs, 'title');
    if (title.value === null) {
      // throw new Error('Please provide a Staff Title', {
      //   cause: title,
      // });
    } else {
      requestData = {
        ...requestData,
        title: title,
      };
    }
    const eloomie_center_id = get(inputs, 'eloomie_center_id');
    if (eloomie_center_id.value === null) {
      // throw new Error('Please provide an Eloomi Center Id', {
      //   cause: eloomie_center_id,
      // });
    } else {
      requestData = {
        ...requestData,
        department_id: eloomie_center_id,
      };
    }
    requestData = {
      ...requestData,
      activate: standard,
    };
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
