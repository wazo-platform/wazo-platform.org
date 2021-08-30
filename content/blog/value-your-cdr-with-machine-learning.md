
# Value your CDR with Machine learning  
The CDR service allows you to keep track of the activity going on your stack. It's a data source that could be valuable in numerous ways. In this article, we will see how to make value out of your CDR using machine learning.  
  
## Why machine learning  
Machine learning is a set of methods based on computing and statistics, to allow so-called *models* to learn the mapping between two statistical variables. It is often used to automate tasks that can't be programmed by hand, like recognizing objects in an image.  
Thereby machine learning allows you to automate tasks that you wouldn't have been able to.  
In the present article, we will take as an example a task consisting of predicting the probability that a person will pick up a given call.  
  
## The CDR dataset  
Like all machine learning tasks, we need a so-called *dataset* which is in our case a dump of the CDR into a CSV file obtained via Portal.  
The CDR is a *tabular dataset*, meaning that we have rows or *occurrences*, and columns or *variables*. In the case of the CDR, each row is a call, and each column is an attribute of the calls.  
The columns are the following:  
- id | *integer* | Unique identifier  
- tenant_uuid | *string* | Unique identifier for the location  
- answered | *boolean* |  
- start | *datetime* | Date and time at which the call landed on the system  
- answer | *datetime* | Date and time at which the call was answered (empty if called wasn't answered)  
- end | *datetime* | Date and time at which the call hung up  
- destination_extension | *string* | Extension (internal id or phone number) of the destination  
- destination_name | *string* | Name of the destination  
- destination_internal_extension | *integer* | Internal extension of the destination  
- destination_internal_context | *string* | Internal context used  
- destination_user_uuid | *string* | Unique identifier of the reached user  
- destination_line_id | *integer* | User line reached  
- duration | *integer* | Call duration  
- call_direction | *string* | Direction of the call (internal, inbound, outbound)  
- requested_name | *string* | Dialed name  
- requested_extension | *string* | Dialed extension (internal id or phone number) of the requested agent  
- requested_context | *string* | Context corresponding of the requested number  
- requested_internal_extension | *integer* | Internal extension corresponding to the request  
- requested_internal_context | *string* | Internal context corresponding to the request  
- source_extension | *string* | Caller extension (internal id or phone number) of the source agent  
- source_name | *string* | Caller name  
- source_internal_extension | *string* | Caller Internal extension  
- source_internal_context | *integer* | Caller internal context  
- source_user_uuid | *string* | Caller uuid  
- source_line_id | *integer* | Id of the caller line  
  
## Processing the data  
The data processing step is by far the most important one in the entire procedure, and will certainly be well elaborated to end up with good models.  
### Type of variables  
In the case of tabular data, we have to make sure that each variable's type that we use in our dataset is one of:  
- Numerical, meaning that a variable is a float number, as the duration of a call in seconds for example  
- Categorical, meaning that the variable will have values from a given ensemble, like the day of the week, or the phone number of the person that called  
### Handling missing values  
In every dataset from the real world, there are sometimes missing values. It can be accidental, (for example if a bug happened during the saving of the CDR ) or intentional, meaning that It doesn't make sense for this variable to have a value for this call (for example, source_internal_extension whenever the call is coming from outside of the stack).  
For some models, you will need to handle them, for others you won't need to.  
To handle a missing value, you can either drop the concerned row/column or replace it with a carefully chosen one. This choice depends on the variable's type:  
- For a numerical column, you may want to choose the mean/median value of the variable or zero in some cases  
- For a categorical column, you may want to choose the most frequent value or create a new category that includes all missing values.  
There is no perfect solution to handle NaN values, it's essentially about testing what does work and what does not.  
  
### Feature engineering  
It's possible to improve the performances of the model via *feature engineering*. This consists of using the existing columns of a dataset to craft new columns that will help the model to learn.  
For our example application, here are some engineered features that might help our model:  
- TimeOfDay | *float* | Numerical variable representing the hour normalized between 0 and 1  
- DayOfWeek | *integer* | Category variable representing which day of the week the call took place on  
- Hour | *integer* | Category variable representing which hour of the day the call took place on  
- DestnationContainsStar | *boolean* | Categorical variable representing whether the destination extension contains a star  
  
When crafting new features, make sure to use variables that you will be able to access when serving the model  
  
## Models  
There are a ton of models that we can use to fit our dataset. We'll quickly introduce the most popular ones  
### Linear model  
Linear models come directly from statistics. They aren't complex models but they can achieve good performances for a lot of problems. Furthermore, Linear models can be fitted without crazy hardware requirements and are very well manageable in production.  
### Tree-based methods  
Tree-based methods, as their name suggests are based on decision trees. They are a bit harder to fit well because they can be subject to overfitting quite easily. You can tune quite a few parameters and must avoid [overfitting](https://en.wikipedia.org/wiki/Overfitting). The most popular tree-based algorithms are the RandomForest and the Gradient Boosting algorithms.  
### Neural Networks  
Neural networks are very popular in machine learning. However, they are difficult to tune on tabular data and often less efficient than tree-based methods. But for big datasets, they are an option you may want to consider.  
## Testing  
A good testing methodology is crucial to estimate the performances of your models. You should be very careful when designing a test pipeline because it's very easy to bias your results.  
For example, feature engineering can be a source of information leakage.  
A typical example is a normalization operation: To compute the mean and std of a variable, you should use your training samples only  
### Cross-validation  
The first good practice is to perform [cross-validation](https://en.wikipedia.org/wiki/Cross-validation_(statistics)). This method allows you to test your model on unseen data while maximizing the use of your data samples. This is especially important if you have a little dataset. Furthermore, the final metric will be based on multiple random seeds, avoiding "lucky" seeds.
### Metrics  
The metrics that you can use depend on the task you want to achieve. 
For classification, you may use [accuracy, precision](https://en.wikipedia.org/wiki/Accuracy_and_precision), [F1](https://en.wikipedia.org/wiki/F-score), or [AUC ROC](https://fr.wikipedia.org/wiki/Courbe_ROC)
For regression you may want to use [MSE](https://en.wikipedia.org/wiki/Mean_squared_error), [RMSE](https://en.wikipedia.org/wiki/Root-mean-square_deviation)
  
## Deploying models  
The most frequent way to deploy models is to serve them through an API. Numerous frameworks exist to fulfill this purpose. One of the most popular is flask as it is very simple and quick to serve ml models using it.
<img src="https://user-images.githubusercontent.com/38444438/131364700-4e370e90-0f03-4924-be40-cc642b5d969a.png" width="100">
