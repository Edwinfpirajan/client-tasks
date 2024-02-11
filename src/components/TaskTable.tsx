import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Swal from 'sweetalert2'; // Importar SweetAlert

import { TaskServices } from "../services/task/Task.services";
import { Dropdown } from "primereact/dropdown";

const TasksTable: React.FC = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [taskDialog, setTaskDialog] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Partial<TaskDTO> | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const response = await TaskServices.getTasks();
    if (response.success) {
      setTasks(response.data as TaskDTO[]);
    } else {
      console.error(response.error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [first, rows]);

  const statusOptions = [
    { label: "Pendiente", value: "pendiente" },
    { label: "Finalizado", value: "finalizado" },
  ];

  const saveTask = async () => {
    if (currentTask && currentTask.id && isEditMode) {
      await TaskServices.updateTask(currentTask.id, currentTask);
    } else if (currentTask) {
      await TaskServices.createTask(currentTask);
    }
    setTaskDialog(false);
    setCurrentTask(null);
    setIsEditMode(false);
    loadTasks();
  };

  const editTask = (taskData: TaskDTO) => {
    setCurrentTask({ ...taskData });
    setIsEditMode(true);
    setTaskDialog(true);
  };

  const deleteTask = async (taskId: string) => {
    const willDelete = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    });
  
    if (willDelete.isConfirmed) {
      const response = await TaskServices.deleteTask(taskId);
      if (response.success) {
        await Swal.fire(
          response.success ? '¡Eliminado!' : 'Error',
        );
        loadTasks();
      } else {
        await Swal.fire(
          'Error',
          response.error, 
          'error'
        );
      }
    }
  };
  

  const renderActions = (rowData: TaskDTO) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-text "
          onClick={() => editTask(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-text p-button-danger"
          onClick={() => deleteTask(rowData.id)}
        />
      </React.Fragment>
    );
  };

  const openNew = () => {
    setCurrentTask({
      title: "",
      category: "",
      status: statusOptions[0].value, 
      description: ""
    });
    setIsEditMode(false);
    setTaskDialog(true);
  };
  
  const taskDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text p-button-danger"
        onClick={() => setTaskDialog(false)}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text p-button-success"
        onClick={saveTask}
      />
    </React.Fragment>
  );

  const onGlobalFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setGlobalFilter((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button label="Nueva Tarea" icon="pi pi-plus" onClick={openNew} />

          <InputText
            type="search"
            onInput={onGlobalFilterChange}
            placeholder="Palabra clave"
            size="30"
          />
        </div>
        <DataTable
          value={tasks}
          paginator
          rows={rows}
          first={first}
          onPage={(e) => setFirst(e.first)}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Se han cargado {first} de {last} de {totalRecords} tareas totales"
          globalFilter={globalFilter}
          emptyMessage="Cargando.."
          responsiveLayout="scroll"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="title"
            header="Titulo"
            filter
            filterPlaceholder="Search by title"
          />
          <Column
            field="category"
            header="Categoría"
            filter
            filterPlaceholder="Search by category"
          />
          <Column
            field="status"
            header="Estado"
            filter
            filterPlaceholder="Search by status"
          />
          <Column
            field="description"
            header="Descripción"
            filter
            filterPlaceholder="Search by description"
          />
          <Column body={renderActions} header="Acción" />
        </DataTable>

        {taskDialog && (
          <Dialog
            visible={taskDialog}
            style={{ width: "450px" }}
            header="Task Details"
            modal
            className="p-fluid"
            footer={taskDialogFooter}
            onHide={() => setTaskDialog(false)}
          >
            {currentTask && (
              <>
                <div className="field">
                  <label htmlFor="title">Titulo</label>
                  <InputText
                    id="title"
                    value={currentTask.title}
                    onChange={(e) =>
                      setCurrentTask({ ...currentTask, title: e.target.value })
                    }
                    required
                    autoFocus
                  />
                </div>
                <div className="field">
                  <label htmlFor="category">Categoría</label>
                  <InputText
                    id="category"
                    value={currentTask.category}
                    onChange={(e) =>
                      setCurrentTask({
                        ...currentTask,
                        category: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="status">Estado</label>
                  <Dropdown
                    id="status"
                    options={statusOptions}
                    value={currentTask.status}
                    onChange={(e) =>
                      setCurrentTask({
                        ...currentTask,
                        status: e.value,
                      })
                    }
                    optionLabel="label"
                    placeholder="Seleccione un estado"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="description">Descripción</label>
                  <InputText
                    id="description"
                    value={currentTask.description}
                    onChange={(e) =>
                      setCurrentTask({
                        ...currentTask,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </>
            )}
          </Dialog>
        )}
      </div>
    </>
  );
};

export default TasksTable;
