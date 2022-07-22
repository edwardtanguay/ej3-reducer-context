import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const FormRow = ({ item, title, variable }) => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <div className="row">
			<label htmlFor={variable}>{title}</label>
            {item.isEditing ? (
                <div className="value">
                    <input
                        type="text"
                        value={item[variable]}
                        onChange={(e) =>
                            dispatch({
                                type: 'handleItemFieldChange',
                                payload: {
                                    itemType: 'germanNouns',
                                    id: item.id,
                                    field:variable,
                                    value: e.target.value
                                }
                            })
                        }
                    />
                </div>
            ) : (
                <div className="value">{item[variable]}</div>
            )}
        </div>
    );
};
