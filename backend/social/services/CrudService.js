exports.store = async (model = null, request = null) => {
  try {
    const data = await model.query().insert(request)
    return {
      statusCode: 200,
      data,
    }
  } catch (error) {
    return {
      statusCode: 400,
      error,
    }
  }
}
exports.update = async (model = null, request = null, record = null) => {
  try {
    const data = await model.query().patch(request).where(record)
    if (data == 1) {
      return {
        statusCode: 200,
        data,
      }
    } else {
      return {
        statusCode: 404,
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      error,
    }
  }
}
exports.getAll = async (model = null) => {
  try {
    const data = await model.query()
    return {
      statusCode: 200,
      data,
    }
  } catch (error) {
    return {
      statusCode: 400,
      error,
    }
  }
}
exports.getSingle = async (model = null, record = null) => {
  try {
    console.log(record)
    const data = await model.query().where(record).first()
    if (data) {
      return {
        statusCode: 200,
        data,
      }
    } else {
      return {
        statusCode: 404,
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      error,
    }
  }
}
exports.delete = async (model = null, record = null) => {
  try {
    const data = await model.query().delete().where(record)
    if (data == 1) {
      return {
        statusCode: 200,
      }
    } else {
      return {
        statusCode: 404,
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      error,
    }
  }
}
