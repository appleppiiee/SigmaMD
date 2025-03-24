const getErrorMessage = (err) => {
    let message = "Something went wrong.";
  
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = "Duplicate key error: A record with this field already exists.";
                break;
            default:
                message = "Database error.";
        }
    } else if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }
    return message;
  };
  
  export default { getErrorMessage };
  