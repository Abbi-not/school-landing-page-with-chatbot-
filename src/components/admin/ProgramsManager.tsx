import { useState } from "react";
import { useSchoolData, Program } from "@/contexts/SchoolDataContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ProgramsManager = () => {
  const { data, updatePrograms } = useSchoolData();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Program | null>(null);
  const [form, setForm] = useState({ name: "", description: "", grades: "", icon: "BookOpen" });

  const resetForm = () => {
    setForm({ name: "", description: "", grades: "", icon: "BookOpen" });
    setEditingItem(null);
  };

  const handleEdit = (item: Program) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description,
      grades: item.grades,
      icon: item.icon,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    updatePrograms(data.programs.filter(item => item.id !== id));
    toast.success("Program deleted");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Program = {
      id: editingItem?.id || Date.now().toString(),
      ...form,
    };

    if (editingItem) {
      updatePrograms(data.programs.map(item => item.id === editingItem.id ? newItem : item));
      toast.success("Program updated");
    } else {
      updatePrograms([...data.programs, newItem]);
      toast.success("Program added");
    }

    setIsOpen(false);
    resetForm();
  };

  return (
    <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-display text-2xl">Manage Programs</CardTitle>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Program</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Program Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g., Primary Education"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of the program"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Grades</Label>
                <Input
                  value={form.grades}
                  onChange={(e) => setForm({ ...form, grades: e.target.value })}
                  placeholder="e.g., Grade 1-4"
                  required
                />
              </div>
              <Button type="submit" className="w-full">{editingItem ? "Update" : "Add"} Program</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {data.programs.map((program) => (
            <Card key={program.id} className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{program.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{program.description}</p>
                    <p className="text-sm text-primary mt-2">{program.grades}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(program)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(program.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramsManager;
